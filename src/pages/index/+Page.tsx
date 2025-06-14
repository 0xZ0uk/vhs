import { Post } from "./Post";

export default function Page() {
  return (
    <>
      <h1>My Vike app</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Post />
        </li>
      </ul>
    </>
  );
}
