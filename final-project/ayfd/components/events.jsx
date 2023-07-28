import Link from 'next/link'
 
export default function Event({ events }) {
  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          <Link
            href={{
              pathname: '/api/[id]',
              query: { id: event.id },
            }}
          >
            {event.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
