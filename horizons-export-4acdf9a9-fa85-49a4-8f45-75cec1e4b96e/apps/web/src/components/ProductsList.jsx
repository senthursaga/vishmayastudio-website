import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Loader2, Heart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { getProducts, getProductQuantities } from '@/api/EcommerceApi';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTQxMjBlIi8+PC9zdmc+";

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { toggle, has } = useWishlist();
  const { toast } = useToast();
  const navigate = useNavigate();
  const variant = useMemo(() => product.variants[0], [product]);
  const hasSale = variant && variant.sale_price_in_cents !== null;
  const price = hasSale ? variant.sale_price_formatted : variant.price_formatted;

  const handleAdd = useCallback(async (e) => {
    e.preventDefault(); e.stopPropagation();
    if (product.variants.length > 1) { navigate(`/product/${product.id}`); return; }
    try {
      await addToCart(product, variant, 1, variant.inventory_quantity);
      toast({ title: 'Added to cart', description: `${product.title} added.` });
    } catch (err) { toast({ title: 'Error', description: err.message }); }
  }, [product, variant, addToCart, toast, navigate]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }}>
      <Link to={`/product/${product.id}`} className="block group">
        <div className="glass-card overflow-hidden">
          <div className="relative overflow-hidden">
            <img src={product.image || placeholderImage} alt={product.title} className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105" />
            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product); }}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur bg-black/50 ${has(product.id) ? 'text-primary' : 'text-white/80'} hover:text-primary`}>
              <Heart size={16} fill={has(product.id) ? 'currentColor' : 'none'} />
            </button>
            {product.ribbon_text && <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] tracking-widest uppercase px-3 py-1">{product.ribbon_text}</div>}
          </div>
          <div className="p-5">
            <h3 className="text-xl font-display truncate">{product.title}</h3>
            <p className="text-xs text-muted-foreground mt-1 h-9 overflow-hidden">{product.subtitle || 'Extended collector artwork — card not included.'}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="gold-text text-lg">{price}</span>
              <button onClick={handleAdd} className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase border hairline px-3 py-2 hover:border-primary hover:text-primary transition">
                <ShoppingCart size={13} /> Add
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProductsList = ({ search = '' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true); setError(null);
        const res = await getProducts();
        if (!res.products.length) { setProducts([]); return; }
        const q = await getProductQuantities({ fields: 'inventory_quantity', product_ids: res.products.map((p) => p.id) });
        const map = new Map(q.variants.map((v) => [v.id, v.inventory_quantity]));
        setProducts(res.products.map((p) => ({ ...p, variants: p.variants.map((v) => ({ ...v, inventory_quantity: map.get(v.id) ?? v.inventory_quantity })) })));
      } catch (err) { setError(err.message || 'Failed to load products'); }
      finally { setLoading(false); }
    })();
  }, []);

  const filtered = useMemo(() => products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase())), [products, search]);

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-12 w-12 text-primary animate-spin" /></div>;
  if (error) return <div className="text-center text-destructive py-24">Error loading products: {error}</div>;
  if (!filtered.length) return <div className="text-center text-muted-foreground py-24">No artwork matches your search.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
    </div>
  );
};

export default ProductsList;
