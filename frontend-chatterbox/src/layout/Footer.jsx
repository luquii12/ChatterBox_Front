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
  {
    name: 'Facebook',
    iconPath: "M18.896 0H1.104C.494 0 0 .494 0 1.104v17.792C0 19.506.494 20 1.104 20h9.586v-7.725H8.078V9.202h2.612V7.002c0-2.592 1.583-4.002 3.894-4.002 1.106 0 2.057.082 2.334.119v2.705h-1.602c-1.257 0-1.5.598-1.5 1.476v1.936h3l-.391 3.073h-2.609V20h5.113c.61 0 1.104-.494 1.104-1.104V1.104C20 .494 19.506 0 18.896 0z"
  },
  {
    name: 'Discord',
    iconPath: "M20 1.5a.5.5 0 0 0-.5-.5H.5a.5.5 0 0 0-.5.5v17.333c0 .275.225.5.5.5h18.99a.5.5 0 0 0 .51-.5V1.5zM6.734 14.732c-.825-.382-1.462-.892-2.058-1.562.16-.223.317-.44.481-.661.772.498 1.518.962 2.333 1.392-.258.268-.504.542-.756.831zm6.533.64c-.239-.265-.48-.519-.716-.778.834-.414 1.597-.857 2.386-1.361.17.228.338.45.51.674a8.6 8.6 0 0 1-2.18 1.465z"
  },
  {
    name: 'Twitter',
    iconPath: "M20 2.558a8.19 8.19 0 0 1-2.357.646A4.118 4.118 0 0 0 19.448.312a8.224 8.224 0 0 1-2.605.996A4.107 4.107 0 0 0 13.847 0c-2.266 0-4.102 1.837-4.102 4.103 0 .32.037.633.106.932-3.41-.171-6.436-1.805-8.46-4.288a4.076 4.076 0 0 0-.555 2.065c0 1.425.725 2.678 1.826 3.412A4.092 4.092 0 0 1 .8 5.61v.051c0 1.99 1.415 3.647 3.292 4.021a4.101 4.101 0 0 1-1.847.07 4.106 4.106 0 0 0 3.835 2.85A8.233 8.233 0 0 1 0 17.538 11.615 11.615 0 0 0 6.29 19.5c7.547 0 11.675-6.256 11.675-11.675 0-.178-.004-.356-.012-.533A8.343 8.343 0 0 0 20 2.558z"
  },
  {
    name: 'GitHub',
    iconPath: "M10 0C4.48 0 0 4.48 0 10c0 4.42 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.157-1.109-1.465-1.109-1.465-.909-.621.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.893 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.221-.252-4.555-1.111-4.555-4.944 0-1.092.39-1.986 1.029-2.683-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 10 4.844a9.56 9.56 0 0 1 2.5.337c1.909-1.294 2.748-1.025 2.748-1.025.545 1.376.202 2.393.099 2.646.64.697 1.028 1.591 1.028 2.683 0 3.842-2.337 4.688-4.566 4.935.359.309.679.919.679 1.852 0 1.337-.012 2.415-.012 2.743 0 .268.18.579.688.481C17.135 18.162 20 14.42 20 10c0-5.52-4.48-10-10-10z"
  },
  {
    name: 'Dribbble',
    iconPath: "M10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0zm6.941 4.93a8.028 8.028 0 0 1 2.001 4.99 18.31 18.31 0 0 0-5.705-.184 25.07 25.07 0 0 0-1.58-3.593 8.02 8.02 0 0 1 5.284-1.213zm-2.201-2.252a8.02 8.02 0 0 1 2.133 1.698 7.985 7.985 0 0 1-4.847 1.217A22.89 22.89 0 0 0 10.74 2.06a7.988 7.988 0 0 1 3.999.618zM10 2.005c.835 0 1.64.122 2.396.348a21.83 21.83 0 0 1 1.797 3.183A7.994 7.994 0 0 1 5.402 7.26 21.866 21.866 0 0 1 10 2.005zM2.124 10c0-.847.123-1.66.348-2.421a8.01 8.01 0 0 1 6.67 3.674 24.8 24.8 0 0 0-6.324 2.486A7.93 7.93 0 0 1 2.124 10zm1.463 3.872a23.205 23.205 0 0 1 5.85-2.327 24.503 24.503 0 0 1 1.702 5.683 8.004 8.004 0 0 1-7.552-3.356zm9.013 3.704a25.847 25.847 0 0 0-1.532-5.141 17.185 17.185 0 0 1 5.052-.041 8.005 8.005 0 0 1-3.52 5.182z"
  }
]
.map((icon, idx) => (
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
  