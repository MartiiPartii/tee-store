const UserInfo = ({ label, text }: { label: string; text: string }) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-brand-muted">{text}</p>
    </div>
  )
}

export default UserInfo
