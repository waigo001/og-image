import { IncomingMessage } from "http";
import { ParsedRequest } from "./types";

export function parseRequest(req: IncomingMessage) {
  console.log("HTTP " + req.url);
  const { pathname, search } = new URL(
    "https://og-image.k-w.info" + req.url || "/"
  );
  const query = new URLSearchParams(search);

  const fontSize = query.get("fontSize");
  const time = query.get("time");
  const md = query.get("md");

  const arr = (pathname || "/").slice(1).split(".");
  let extension = "";
  let text = "";
  if (arr.length === 0) {
    text = "";
  } else if (arr.length === 1) {
    text = arr[0];
  } else {
    extension = arr.pop() as string;
    text = arr.join(".");
  }

  const parsedRequest: ParsedRequest = {
    fileType: extension === "jpeg" ? extension : "png",
    text: decodeURIComponent(text),
    md: md === "1" || md === "true",
    time: time || "",
    fontSize: fontSize || "128px",
  };

  return parsedRequest;
}
