/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    // Newsletter signups — public create only
    let news;
    try {
      news = app.findCollectionByNameOrId("newsletter_signups");
    } catch (_) {
      news = new Collection({
        type: "base",
        name: "newsletter_signups",
        listRule: null,
        viewRule: null,
        createRule: "",
        updateRule: null,
        deleteRule: null,
        fields: [
          { name: "email", type: "email", required: true },
          { name: "created", type: "autodate", onCreate: true, onUpdate: false },
        ],
        indexes: [
          "CREATE UNIQUE INDEX idx_news_email ON newsletter_signups (email)",
        ],
      });
      app.save(news);
    }

    // Contact & commission enquiries — public create only
    let msg;
    try {
      msg = app.findCollectionByNameOrId("contact_messages");
    } catch (_) {
      msg = new Collection({
        type: "base",
        name: "contact_messages",
        listRule: null,
        viewRule: null,
        createRule: "",
        updateRule: null,
        deleteRule: null,
        fields: [
          { name: "name", type: "text", required: true, max: 120 },
          { name: "email", type: "email", required: true },
          { name: "subject", type: "text", max: 160 },
          { name: "message", type: "text", required: true, max: 4000 },
          { name: "kind", type: "select", maxSelect: 1, values: ["contact", "commission"] },
          { name: "created", type: "autodate", onCreate: true, onUpdate: false },
        ],
      });
      app.save(msg);
    }
  },
  (app) => {
    for (const n of ["newsletter_signups", "contact_messages"]) {
      try {
        app.delete(app.findCollectionByNameOrId(n));
      } catch (_) { /* ignore */ }
    }
  },
);
