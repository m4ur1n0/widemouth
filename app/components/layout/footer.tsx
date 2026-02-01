import { uiIndie as ui } from '@/app/ui/classes'

const Footer = () => {
  return (
    <footer className="w-full py-8 mt-16">
      <div className={`${ui.container} text-center`}>
        <div className={`${ui.rule} mb-6`} />
        <p className={ui.small}>
          © 2026 Widemouth
        </p>
      </div>
    </footer>
  )
}

export default Footer
