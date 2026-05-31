// import { NextResponse } from 'next/server';

// const PDF_URL = 'https://github.com/SwethaHolla/resume/releases/latest/download/Swetha_Holla_Umashankara.pdf';

// export async function GET() {
//   try {
//     const response = await fetch(PDF_URL);
//     if (!response.ok) {
//       return new NextResponse('Resume not found', { status: response.status || 502 });
//     }
//     const buffer = Buffer.from(await response.arrayBuffer());
//     return new NextResponse(buffer, {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': 'inline; filename=Swetha_Holla_Resume.pdf',
//         'Cache-Control': 'public, max-age=3600, stale-while-revalidate=60',
//       },
//     });
//   } catch (error) {
//     console.error('resume proxy error', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';

const url =
  'https://github.com/SwethaHolla/resume/releases/latest/download/Swetha_Holla_Umashankara.pdf';

export async function GET() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      let bodyText: string | null = null;
      try {
        bodyText = await response.text();
      } catch (e) {
        /* ignore */
      }
      console.error('resume fetch failed', response.status, bodyText);
      return new NextResponse(bodyText ?? 'Resume not found', {
        status: response.status || 502,
      });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename=Swetha_Holla_Umashankara_Resume.pdf',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('resume proxy error', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}