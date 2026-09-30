import { getCategories } from "@/lib/queries";
import { Footer } from "@/components/store/footer";
import { Header } from "@/components/store/header";

export default async function StoreLayout({ children }: LayoutProps<"/">) {
  const categories = (await getCategories()).map(({ name, slug }) => ({ name, slug }));

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>
      <Header categories={categories} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer categories={categories} />
    </>
  );
}
