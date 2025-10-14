import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
import MobileSidebar from '../MobileSidebar';
import styles from "./CommonLayout.module.css"

const CommonLayout = ({ children, sectionTitle }: { children: React.ReactNode, sectionTitle?: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex'>
            <div className='hidden lg:block'>
                <Sidebar />
            </div>
            <div className='block lg:hidden'>
                {isOpen &&
                    <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                }
            </div>
            <div className=' w-[100%]'>
                <Header setIsOpen={setIsOpen} />
                <div className={`${styles.bodyContentWrapper}`}>
                    <h2 className='text-[24px] font-semibold' style={{ marginBottom: "1rem" }}>{sectionTitle}</h2>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CommonLayout
