import type { BaseLayoutProps } from '@fumadocs/base-ui/layouts/shared'
import Image from 'next/image'

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          {/* Ody, the app's mascot: the light and the dark icon, one shown per theme. */}
          <Image src="/brand/ody-icon.png" alt="" width={22} height={22} className="rounded-md dark:hidden" />
          <Image src="/brand/ody-icon-dark.png" alt="" width={22} height={22} className="hidden rounded-md dark:block" />
          <span className="font-medium">Actovia</span>
        </>
      ),
      url: '/docs'
    },
    links: [{ text: 'Home', url: '/' }],
    githubUrl: 'https://github.com/actovia-ai/actovia'
  }
}
