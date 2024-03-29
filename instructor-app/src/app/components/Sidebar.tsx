import Link from "next/link"

export default function Sidebar() {

  return (<>
    <div className="drawer z-20">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">

        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">

          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>

        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 pt-5 text-2xl w-80 min-h-full bg-base-200 text-base-content">

          <li><Link href='/dashboard'>Home</Link></li>
          <li><Link href='/dashboard/attendance'>Attendance</Link></li>
          <li><Link href='/dashboard/courses'>Courses</Link></li>
          <li><Link href='/dashboard/rooms'>Rooms</Link></li>


        </ul>
      </div>
    </div>

  </>)
}