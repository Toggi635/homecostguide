import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold font-serif text-ink/20 mb-4">404</h1>
      <h2 className="text-xl font-semibold font-serif mb-4">Page Not Found</h2>
      <p className="text-muted mb-8">
        Sorry, we could not find the page you are looking for. Try searching our cost guides.
      </p>
      <Button href="/">Go Home</Button>
    </div>
  );
}
