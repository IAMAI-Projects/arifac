import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiDomain = process.env.EDMINGLE_API_DOMAIN;
  const apiToken = process.env.EDMINGLE_API_TOKEN;
  const institutionId = process.env.EDMINGLE_INSTITUTION_ID;

  if (!apiDomain || !apiToken || !institutionId) {
    console.error('Missing Edmingle API configuration:', { apiDomain: !!apiDomain, apiToken: !!apiToken, institutionId: !!institutionId });
    return NextResponse.json({ error: 'Edmingle configuration missing' }, { status: 500 });
  }

  try {
    const url = `https://${apiDomain}/nuSource/api/v1/institute/${institutionId}/courses?get_tutors=1&get_tags=1&get_student_count=1`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': apiToken,
        'accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({ 
        error: 'Failed to fetch courses from Edmingle',
        status: response.status,
        details: errorData 
      }, { status: response.status });
    }

    const result = await response.json();
    
    // Flatten course_bundles from all institute_courses entries
    let allBundles: any[] = [];
    if (result.institute_courses && Array.isArray(result.institute_courses)) {
      result.institute_courses.forEach((dept: any) => {
        if (dept.course_bundles && Array.isArray(dept.course_bundles)) {
          allBundles = [...allBundles, ...dept.course_bundles];
        }
      });
    }

    // Return in a format the client expectation: { status: 'success', data: [...] }
    return NextResponse.json({
      status: 'success',
      data: allBundles,
      original_response: result // for debugging
    });
  } catch (error) {
    console.error('Error fetching Edmingle courses:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
