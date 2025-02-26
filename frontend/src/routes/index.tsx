import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="p-4 md:p-8 bg-white">
      <div className="max-w-screen-lg mx-auto border-2 border-black p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left column - Hero */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-24 lg:self-start">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-none transform -rotate-1">
              YOUR BIG IDEA HERE
            </h1>
            <p className="text-sm font-mono bg-yellow-100 inline-block p-2 mt-4 md:mt-6 border-2 border-black">
              catchy tagline goes here
            </p>

            <div className="mt-6 md:mt-8 space-y-3">
              <p className="text-sm font-mono">ready to start?</p>
              <Link
                to="/about"
                className="px-4 py-2 border-2 border-black bg-white inline-block
                hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                hover:-translate-y-[2px] transition-all text-sm"
              >
                adsad
                {/* {userQuery.data?.id ? "dashboard →" : "get started →"} */}
              </Link>
            </div>
          </div>

          {/* Right side content */}
          <div className="w-full lg:w-2/3 space-y-8">
            <div className="border-2 border-black p-4 md:p-6">
              <h2 className="text-xl font-bold mb-4">VALUE PROP</h2>
              <p className="font-mono text-sm leading-relaxed">
                main benefit explanation <br />
                secondary benefit here
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 font-mono text-sm">
                <div className="border border-black p-3 hover:-translate-y-[2px] transition-transform">
                  <div className="mb-1">✨</div>
                  <div>feature 1</div>
                </div>
                <div className="border border-black p-3 hover:-translate-y-[2px] transition-transform">
                  <div className="mb-1">🚀</div>
                  <div>feature 2</div>
                </div>
                <div className="border border-black p-3 hover:-translate-y-[2px] transition-transform">
                  <div className="mb-1">💫</div>
                  <div>feature 3</div>
                </div>
              </div>
            </div>

            <div className="border-2 border-black p-4 md:p-6">
              <h2 className="text-xl font-bold mb-4">HOW IT WORKS</h2>
              <ul className="font-mono text-sm space-y-3">
                {[
                  "step one description",
                  "step two description",
                  "step three description",
                  "step four description",
                  "final step description",
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="border border-black w-6 h-6 flex items-center justify-center">
                      {i + 1}
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-3 border border-black bg-yellow-50 text-sm font-mono">
                protip: helpful suggestion here
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 md:mt-12 pt-4 border-t-2 border-black font-mono text-xs flex flex-col sm:flex-row justify-between gap-4">
          <div>© {new Date().getFullYear()} sqlueless</div>
          <div className="space-x-4">{/* same social links... */}</div>
        </footer>
      </div>
    </div>
  );
}
