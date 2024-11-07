import { useEffect, useState } from "react";
import { Form, Link, Outlet, useLoaderData, useLocation, useNavigation } from "react-router-dom";
import { Tours } from "../data-access/tours";
import { ScrollToTop } from "../lib/scroll-to-top";

// const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const tours = await Tours.getTours(q);
  // await wait(1000);
  return { tours, q };
}

export type LoaderData = Awaited<ReturnType<typeof loader>>;

export default function Root() {
  const { q } = useLoaderData() as LoaderData;
  const [query, setQuery] = useState(q);
  const { state } = useNavigation();
  const location = useLocation();

  const isBookingPage = location.pathname.includes("/book/");

  useEffect(() => {
    setQuery(q);
  }, [q]);

  return (
    <>
      <ScrollToTop />
      <header className="container">
        <Link to="/">
          <h1>Super Tours</h1>
        </Link>
      </header>
      <Form
        id="search-form"
        role="search"
        className="container"
        style={{
          display: isBookingPage ? 'none' : 'flex',
          gap: '0.5rem',
          alignItems: 'center',
        }}
      >
        <input
          id="q"
          aria-label="Search trips"
          placeholder="Search trips..."
          type="search"
          name="q"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <div
          id="search-spinner"
          className="spinner"
          style={{ display: query !== '' && state === 'loading' ? 'block' : 'none' }}
        />
      </Form>

      <main id="detail" className="container">
        <Outlet />
      </main>
    </>
  );
}
