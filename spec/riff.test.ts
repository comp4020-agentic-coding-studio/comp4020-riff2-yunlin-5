import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// The riff's brief, not the crit's. The crit agent's redesign was a restrained
// five-page essay: cream paper, serif type, and a colophon explaining itself.
// This riff keeps the writing and swaps the premise. The site is the
// organisation's site again, so it has to carry the things a visitor actually
// came for (the news, the events, the software, the way in), in a monochrome
// Tailwind design that puts the real TUG logo back on the page.
//
// Replaces spec/crit2.test.ts. What survives from it: link to the real
// organisation, stay static, and reach every page from home.

const DIST = resolve("dist");
const ORIGINAL_SITE = "https://tug.org/";

function htmlFiles(dir: string = DIST): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

const pages = htmlFiles().map((path) => ({
  name: relative(DIST, path),
  html: readFileSync(path, "utf8"),
  doc: new JSDOM(readFileSync(path, "utf8")).window.document,
}));

function hrefs({ doc }: (typeof pages)[number]): string[] {
  return [...doc.querySelectorAll("a[href]")].map(
    (a) => a.getAttribute("href") ?? "",
  );
}

describe("links to the real organisation", () => {
  it("at least one page links to tug.org, the real site being redesigned", () => {
    expect(pages.some((page) => hrefs(page).some((h) => h.startsWith(ORIGINAL_SITE))))
      .toBe(true);
  });

  it("the colophon is gone: the site speaks as the organisation, not about itself", () => {
    expect(pages.map(({ name }) => name)).not.toContain("colophon.html");
  });
});

describe("static, no backend", () => {
  for (const { name, doc } of pages) {
    it(`${name} has no form (no logins, no booking systems)`, () => {
      expect(doc.querySelectorAll("form").length).toBe(0);
    });

    it(`${name} ships no client-side script`, () => {
      expect(doc.querySelectorAll("script").length).toBe(0);
    });
  }
});

describe("navigation reaches every page", () => {
  it("the home page links to every other page in the site", () => {
    const home = pages.find(({ name }) => name === "index.html");
    expect(home).toBeTruthy();
    const navHrefs = new Set(
      [...home!.doc.querySelectorAll("nav a[href]")].map((a) =>
        a.getAttribute("href"),
      ),
    );
    for (const { name } of pages) {
      if (name === "index.html") continue;
      expect(navHrefs.has(`./${name}`)).toBe(true);
    }
  });
});

describe("the organisation's own identity", () => {
  for (const { name, doc } of pages) {
    it(`${name} shows the real TUG logo`, () => {
      const logo = doc.querySelector('img[src*="tuglogo"]');
      expect(logo, "every page should carry the TUG logo").toBeTruthy();
      expect(logo!.getAttribute("alt")?.trim()).toBeTruthy();
    });
  }
});

describe("the visitor can act", () => {
  for (const { name } of pages) {
    const page = pages.find((p) => p.name === name)!;

    it(`${name} offers a way to join and a way to donate`, () => {
      const links = hrefs(page);
      expect(
        links.some((h) => h.includes("join") || h.includes("memberapp")),
        "a join or renew link",
      ).toBe(true);
      expect(links.some((h) => h.includes("donate")), "a donation link").toBe(true);
    });
  }

  it("the home page carries news and upcoming events, as the real site does", () => {
    const home = pages.find(({ name }) => name === "index.html")!;
    const text = home.doc.body.textContent ?? "";
    expect(home.doc.querySelector("#news"), "a news section").toBeTruthy();
    expect(text).toMatch(/upcoming events/i);
    // Not a stub: news items link out to the announcements they describe.
    expect(
      home.doc.querySelectorAll("#news a[href]").length,
      "news items should link to their sources",
    ).toBeGreaterThan(4);
  });

  it("the directory of links the redesign dropped is back", () => {
    const home = pages.find(({ name }) => name === "index.html")!;
    const outbound = hrefs(home).filter((h) => h.startsWith("http"));
    expect(new Set(outbound).size).toBeGreaterThan(20);
  });
});

describe("house style", () => {
  for (const { name, html, doc } of pages) {
    it(`${name} uses no em dashes`, () => {
      const text = doc.body.textContent ?? "";
      expect(text).not.toContain("—");
      expect(html).not.toContain("&mdash;");
    });
  }
});
