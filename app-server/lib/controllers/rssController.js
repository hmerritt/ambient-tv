require("dotenv").config();

const Storage = require("./storageController");

class Rss {
    constructor() {
        this.rss = new Storage();

        // Default values
        this.rss.set("RSS image feed", "title");
        this.rss.set("RSS image feed", "description");
        this.rss.set(
            'xmlns:media="http://search.yahoo.com/mrss/"',
            "namespaces"
        );
        this.rss.set("item", "item");
        this.rss.set([], "data");
    }

    set(which, value) {
        this.rss.set(value, which);
    }

    get() {
        let output = `<?xml version=\"1.0\" encoding=\"UTF-8\" ?>
<rss version=\"2.0\" ${this.rss.get("namespaces")}>
    <channel>
        <title>${this.rss.get("title")}</title>
        <link>${this.rss.get("link")}</link>
        <description>${this.rss.get("description")}</description>
        `;

        this.rss.get("data").forEach((image, i) => {
            output += `
    <${this.rss.get("item")}>
        <title>${image.fileName}</title>
        <link>${image.link}</link>
        <description>${image.description}</description>
        <category>${image.category}</category>
        <media:title type="plain">${image.description}</media:title>
        <media:content url="${image.link}" medium="image"/>
    </${this.rss.get("item")}>
            `;
        });

        output += `
</channel>
</rss>
        `;

        return output;
    }
}

module.exports = Rss;
