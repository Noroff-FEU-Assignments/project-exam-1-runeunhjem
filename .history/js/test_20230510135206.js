import { s as _ } from "./hamburger-1e546300.js";
import { F as $ } from "./fetchHelper-6bc6f5dd.js";
const L = document.querySelector(".spinner"),
  k = document.location.search,
  q = new URLSearchParams(k),
  c = q.get("id"),
  F = [
    ".blog-section",
    ".blog-title",
    ".blog",
    ".blog-container",
    ".date",
    ".author",
    "form",
    ".input-field-name",
    ".input-field-comment",
    ".article-header",
    ".input-field-email",
    ".comment-field",
    ".comment-count",
    ".snackbar-wrapper",
    ".comment-btn",
    ".modal",
    ".modal-img",
    ".modal-btn",
  ],
  Y = F.map((e) => document.querySelector(e)),
  [te, B, oe, H, N, T, O, f, v, P, ne, V, W, R, E, M, U, z] = Y;
async function G(e) {
  try {
    return await (await new $(`https://wave.jeandahldev.no/wp-json/wp/v2/posts/${e}`).get("?_embed")).json();
  } catch (t) {
    console.log(t);
  }
}
O.addEventListener("submit", async function (e) {
  e.preventDefault();
  const t = f.value.toLowerCase().trim(),
    o = v.value.toLowerCase().trim();
  if (t.length > 0 && o.length > 0)
    try {
      E.disabled = !0;
      const C = await new $("https://wave.jeandahldev.no/wp-json/wp/v2/").post(`comments?post=${c}`, {
        post: c,
        author_name: `${f.value}`,
        content: `${v.value}`,
      });
      console.log(C);
    } catch (r) {
      console.log(r);
    } finally {
      (E.disabled = !1), (f.value = ""), (v.value = ""), _(R, "Success! comment pending approval");
    }
});
async function J() {
  try {
    return await (await new $("https://wave.jeandahldev.no/wp-json/wp/v2/").get(`comments?post=${c}`)).json();
  } catch (e) {
    console.log(e);
  }
}
function K(e, t = "") {
  const o = e.content.rendered;
  new DOMParser().parseFromString(o, "text/html").body.childNodes.forEach((n) => {
    const a = document.createElement("p");
    return (a.className = "paragraph-text"), (a.textContent = n.textContent), H.append(a);
  }),
    t.forEach((n) => {
      const a = n.content.rendered,
        A = new DOMParser().parseFromString(a, "text/html").body.firstChild.textContent,
        p = document.createElement("div");
      p.classList = "comment-container";
      const x = document.createElement("p");
      x.textContent = A;
      const S = document.createElement("h4");
      S.textContent = n.author_name;
      const D = document.createElement("small"),
        g = new Date(n.date),
        h = g.getDate(),
        w = g.getMonth() + 1,
        I = g.getFullYear();
      let b, y;
      return (
        w < 10 ? (b = `0${w}`) : (b = w),
        h < 10 ? (y = `0${h}`) : (y = h),
        (D.textContent = `Published: ${y}.${b}.${I}`),
        p.append(D, S, x),
        V.append(p)
      );
    }),
    (P.style.backgroundImage = `url(${e._embedded["wp:featuredmedia"][0].source_url})`),
    (B.textContent = e.title.rendered),
    (T.textContent = `Author: ${e._embedded.author[0].name}`),
    (U.src = e._embedded["wp:featuredmedia"][0].source_url);
  const l = new Date(e.date),
    d = l.getDate(),
    m = l.getMonth() + 1,
    j = l.getFullYear();
  let i, u;
  m < 10 ? (i = `0${m}`) : (i = m),
    d < 10 ? (u = `0${d}`) : (u = d),
    (N.textContent = `Published: ${u}.${i}.${j}`),
    (W.textContent = `Comments (${t.length})`);
}
P.addEventListener("click", () => {
  M.showModal(), console.log(s.nextSibling), document.querySelector("body").classList.add("stop-scrolling");
});
z.addEventListener("click", () => {
  M.close(), document.querySelector("body").classList.remove("stop-scrolling");
});
const s = document.querySelector("dialog");
s.addEventListener("click", (e) => {
  e.target === s && (s.close(), document.querySelector("body").classList.remove("stop-scrolling"));
});
async function Q() {
  try {
    L.classList.add("show");
    const e = await G(c),
      t = await J();
    K(e, t);
  } catch (e) {
    console.log(e);
  } finally {
    L.classList.remove("show");
  }
}
Q();
