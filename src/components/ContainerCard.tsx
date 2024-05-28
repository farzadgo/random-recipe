

const ContainerCard = ({ children, title }: { children: React.ReactNode, title: string }) => {
  return (
    <div className='mx-auto flex flex-col gap-6 mb-16 max-w-screen-sm rounded-2xl'>
      <h1 className='px-2 text-base sm:text-xl mx-auto font-bold'> {title} </h1>
      {children}
    </div>
  )
}

export default ContainerCard