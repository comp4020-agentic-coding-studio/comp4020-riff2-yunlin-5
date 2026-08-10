import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// This week's brief: "Unsolicited redesign" — the content is real (a real
// organisation's), the design is ours. These check the spec lines that are
// mechanically checkable; "yours is better in some way you can articulate"
// and "restructured and rewritten, not pasted wholesale" are for the crit.

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
  doc: new JSDOM(readFileSync(path, "utf8")).window.document,
}));

describe("links to the real organisation", () => {
  it("at least one page links to tug.org, the real site being redesigned", () => {
    const linksOut = pages.some(({ doc }) =>
      [...doc.querySelectorAll("a[href]")].some((a) =>
        a.getAttribute("href")?.startsWith(ORIGINAL_SITE),
      ),
    );
    expect(linksOut).toBe(true);
  });

  it("the colophon says why this org and what its site gets wrong", () => {
    const colophon = pages.find(({ name }) => name === "colophon.html");
    expect(colophon, "colophon.html should exist").toBeTruthy();
    const text = colophon!.doc.body.textContent ?? "";
    expect(text.length).toBeGreaterThan(200);
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
    const hrefs = new Set(
      [...home!.doc.querySelectorAll("nav a[href]")].map((a) =>
        a.getAttribute("href"),
      ),
    );
    const otherPages = pages
      .map(({ name }) => name)
      .filter((name) => name !== "index.html");
    for (const page of otherPages) {
      expect(hrefs.has(`./${page}`)).toBe(true);
    }
  });
});
