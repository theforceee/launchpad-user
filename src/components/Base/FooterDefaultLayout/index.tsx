const FooterDefaultLayout = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return <div className="bg-black text-white w-full">Footer</div>
}

export default FooterDefaultLayout
