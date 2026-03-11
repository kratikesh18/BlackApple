"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold">About blackApple</h1>
          <p className="text-gray-300 text-lg">
            A community-powered lyrics platform integrated with Spotify.
          </p>
        </div>

        {/* Project Description */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">What is blackApple?</h2>
          <p className="text-gray-300 leading-relaxed">
            blackApple is a modern lyrics platform designed to bridge the gap
            between music streaming and accessible song lyrics. The platform
            integrates with Spotify to detect what users are currently listening
            to and allows them to instantly view or contribute lyrics for that
            song.
          </p>

          <p className="text-gray-300 leading-relaxed">
            Many songs across the world still lack publicly available lyrics or
            structured lyric databases. blackApple aims to solve this by
            creating an open and collaborative ecosystem where listeners help
            build the lyrics library together.
          </p>
        </section>

        {/* How it Works */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">How It Works</h2>

          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Login with your Spotify account.</li>
            <li>
              The platform detects the song you are currently listening to.
            </li>
            <li>If lyrics exist, you can view them instantly.</li>
            <li>If lyrics are missing, you can contribute them.</li>
            <li>
              Your contribution helps expand the community lyrics library.
            </li>
          </ul>
        </section>

        {/* Contribution */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Contributing Lyrics</h2>
          <p className="text-gray-300">
            Contributions are a core part of the blackApple ecosystem. If a song
            does not have lyrics available, users can submit lyrics through the
            contribution page. These contributions help make lyrics accessible
            to more listeners around the world.
          </p>
        </section>

        {/* Copyright */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Lyrics Copyright</h2>
          <p className="text-gray-300 leading-relaxed">
            All lyrics available on this platform are the property of their
            respective artists, songwriters, and publishers.
          </p>

          <p className="text-gray-300 leading-relaxed">
            blackApple does not claim ownership of any lyrics. Lyrics are
            provided for educational and informational purposes only. If you are
            a copyright holder and believe that any content should be removed or
            modified, please contact the developer.
          </p>
        </section>

        {/* Developer */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Developer</h2>
          <p className="text-gray-300">
            blackApple was designed and developed by{" "}
            <span className="font-semibold text-white">
              Kartikesh Pachkawade
            </span>
            .
          </p>

          <p className="text-gray-300">
            You can explore more of my work and projects here:
          </p>

          <Link
            href="https://kartikeshpachkawade.vercel.app"
            target="_blank"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            https://kartikeshpachkawade.vercel.app
          </Link>
        </section>

        {/* Footer */}
        <div className="pt-10 border-t border-gray-700 text-sm text-gray-400">
          © {new Date().getFullYear()} Kartikesh Pachkawade • Lyrics belong to
          their respective artists and copyright holders.
        </div>
      </div>
    </div>
  );
}
