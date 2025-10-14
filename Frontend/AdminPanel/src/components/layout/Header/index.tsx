import React from 'react'
import styles from "./Header.module.css"

const Header = ({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <div className={`w-[100%]  ${styles.headerWrapper}`}>
      <div className='flex items-center justify-end'>
        <div className='block lg:hidden' style={{ marginRight: "1rem" }} onClick={() => setIsOpen((prev: boolean) => !prev)}>
          <i>icon</i>
        </div>
        <div className={`${styles.profileInfoWrapper} flex gap-4 items-center`}>
          <div className={`${styles.profileImgWrapper} `}>
            <i>ic</i>
          </div>

          <div className=''>
            <h5 className='text-[#FFFFFF66]'>Namiq Rzayev</h5>
            <p className='text-[#FF3EFC] text-[13px]'>Super Admin</p>
          </div>
        </div>
      </div>

    </div >
  )
}

export default Header
