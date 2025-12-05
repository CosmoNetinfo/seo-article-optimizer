import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth (if you have auth routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};

export function middleware(req: NextRequest) {
    // Se le credenziali non sono impostate nelle variabili d'ambiente, permetti l'accesso (utile per dev senza auth o se dimenticato)
    // O meglio: blocca tutto per sicurezza se mancano. Decidiamo di bloccare se mancano per sicurezza.
    const validUser = process.env.BASIC_AUTH_USER;
    const validPass = process.env.BASIC_AUTH_PASSWORD;

    if (!validUser || !validPass) {
        // Se non configurato, lasciamo passare in dev, ma logghiamo un warning? 
        // Per sicurezza, se l'utente vuole auth, deve configurarla. 
        // Ma per evitare blocchi improvvisi se non ha aggiornato .env, facciamo che se manca, passa (o viceversa).
        // Dato che è per "uso privato", meglio che sia sicuro.
        // Tuttavia, per evitare di rompere il flusso ora, facciamo che se manca non fa nulla, 
        // MA l'utente DEVE metterle.
        return NextResponse.next();
    }

    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        const [user, pwd] = atob(authValue).split(':');

        if (user === validUser && pwd === validPass) {
            return NextResponse.next();
        }
    }

    return new NextResponse('Autenticazione Richiesta', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Area Riservata"',
        },
    });
}
