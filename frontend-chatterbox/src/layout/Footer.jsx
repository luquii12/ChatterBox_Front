const Footer = () => (
    <footer className="bg-white background-secondary">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          {[
            {
              title: 'Company',
              links: ['About', 'Careers', 'Brand Center', 'Blog']
            },
            {
              title: 'Help center',
              links: ['Discord Server', 'Twitter', 'Facebook', 'Contact Us']
            },
            {
              title: 'Legal',
              links: ['Privacy Policy', 'Licensing', 'Terms & Conditions']
            },
            {
              title: 'Download',
              links: ['iOS', 'Android', 'Windows', 'MacOS']
            }
          ].map((section, i) => (
            <div key={i}>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {section.title}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {section.links.map((link, idx) => (
                  <li className="mb-4" key={idx}>
                    <a href="#" className="hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
  
        <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            © 2023 <a href="https://flowbite.com/">Flowbite™</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
            {[
              { name: 'Facebook', iconPath: "M6.135 3H8V0H6.135..." },
              { name: 'Discord', iconPath: "M16.942 1.556a16.3..." },
              { name: 'Twitter', iconPath: "M20 1.892a8.178..." },
              { name: 'GitHub', iconPath: "M10 .333A9.911..." },
              { name: 'Dribbble', iconPath: "M10 0a10 10..." }
            ].map((icon, idx) => (
              <a key={idx} href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d={icon.iconPath} />
                </svg>
                <span className="sr-only">{icon.name} page</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
  
  export default Footer;
  