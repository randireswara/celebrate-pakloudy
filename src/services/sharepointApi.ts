export interface Message {
  Name: string;
  Message: string;
}

export interface MessageResponse {
  messages: Message[];
  total: number;
}

export async function getMessages(): Promise<MessageResponse> {
  try {
    const url = new URL(
      'https://default03d74d44d91d48c295d6e16bb9e2d0.56.environment.api.powerplatform.com/powerautomate/automations/direct/workflows/c8f0116d02f84fffb4a02c5c5844ae60/triggers/manual/paths/invoke'
    );

    url.search = new URLSearchParams({
      'api-version': '1',
      sp: '/triggers/manual/run',
      sv: '1.0',
      sig: 'rW9voL9DYkwPjhvITG_-y3U_MrSSDmHv1m0WiquRiGs',
    }).toString();

    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    const data = await res.json();
    const messages: Message[] = Array.isArray(data)
      ? data
      : Array.isArray(data.value)
        ? data.value
        : [];

    return {
      messages,
      total: messages.length,
    };
  } catch {
    const dummy = [
      {
        Name: 'Andi Ridwan',
        Message: 'Terima kasih Pak Lou atas kepemimpinannya.', 
        
      },
      { Name: 'Sari Ningish', Message: 'Inspirasi bagi kami semua.' },
      { Name: 'Bagas Prasetyo', Message: 'Sehat selalu Pak Lou!' },
    ];

    return {
      messages: dummy,
      total: dummy.length,
    };
  }
}
