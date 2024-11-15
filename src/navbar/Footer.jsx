import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
		<div className="container mx-auto px-6">
			<div className="flex flex-wrap justify-between">
				<div className="w-full md:w-1/3 mb-6">
					<h2 className="text-xl font-bold mb-4">About Us</h2>
					<p className="text-gray-400">We are dedicated to sharing insightful
						content on various topics. Join us on our journey!</p>
				</div>
				<div className="w-full md:w-1/3 mb-6">
					<h2 className="text-xl font-bold mb-4">Quick Links</h2>
					<ul>
						<li><a href="/about"
							className="text-gray-300 hover:text-blue-400">About</a></li>
						<li><a href="/contact"
							className="text-gray-300 hover:text-blue-400">Contact</a></li>
						<li><a href="/privacy"
							className="text-gray-300 hover:text-blue-400">Privacy Policy</a></li>
						<li><a href="/terms"
							className="text-gray-300 hover:text-blue-400">Terms of Service</a></li>
					</ul>
				</div>
				<div className="w-full md:w-1/3 mb-6">
					<h2 className="text-xl font-bold mb-4">Follow Us</h2>
					<div className="flex space-x-4">
						<a href="#" className="text-gray-300 hover:text-blue-400"> <svg
								className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 17.93c-.26 0-.5-.01-.75-.02C8.66 19.7 6 16.77 6 13.5c0-1.44.5-2.76 1.34-3.83.04.01.09.02.14.02 1.13 0 2.14-.39 2.96-1.05-.01.02-.01.05-.01.07 0 1.18-.71 2.48-1.76 2.88-.38.15-.79.23-1.21.23-.29 0-.57-.03-.85-.09.57 1.74 2.21 3 4.15 3 .99 0 1.9-.34 2.63-.9-.27.83-1.05 1.43-1.97 1.72-.76.26-1.58.39-2.42.39z" /></svg>
						</a> <a href="#" className="text-gray-300 hover:text-blue-400"> <svg
								className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm3.58 12.39c-.45.26-1.05.54-1.71.54-1.01 0-1.85-.85-1.85-1.85 0-.83.54-1.56 1.28-1.77.31-.1.57-.22.77-.34.2-.12.38-.25.52-.38.24-.24.37-.57.37-.91 0-.74-.64-1.39-1.39-1.39-.61 0-1.14.39-1.34.96-.23-.06-.47-.1-.72-.1-1.02 0-1.85.83-1.85 1.85 0 1.01.83 1.85 1.85 1.85.87 0 1.61-.61 1.82-1.39zm-1.88-2.03c.21-.1.38-.3.38-.54 0-.3-.23-.53-.53-.53s-.53.23-.53.53c0 .24.17.44.39.54.04.02.09.03.14.03.05 0 .1-.01.14-.03z" /></svg>
						</a> <a href="#" className="text-gray-300 hover:text-blue-400"> <svg
								className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 17.93c-.26 0-.5-.01-.75-.02C8.66 19.7 6 16.77 6 13.5c0-1.44.5-2.76 1.34-3.83.04.01.09.02.14.02 1.13 0 2.14-.39 2.96-1.05-.01.02-.01.05-.01.07 0 1.18-.71 2.48-1.76 2.88-.38.15-.79.23-1.21.23-.29 0-.57-.03-.85-.09.57 1.74 2.21 3 4.15 3 .99 0 1.9-.34 2.63-.9-.27.83-1.05 1.43-1.97 1.72-.76.26-1.58.39-2.42.39z" /></svg>
						</a>
					</div>
				</div>
			</div>
			<div className="mt-10 border-t border-gray-700 pt-4 text-center">
				<p className="text-gray-500">&copy; 2024 BlogX. All rights reserved.</p>
			</div>
		</div>
	</footer>
  )
}

export default Footer