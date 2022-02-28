import { ReactNode } from "react"
import Footer from "./Footer"
import Header from "./Header"

const Layout = ({ children }: {children: ReactNode[] | ReactNode}) => {
    return (<>
        <Header />
        <main className="container mx-auto">
            {children}
        </main>
        <Footer />
    </>)
}

export default Layout;