const UserInfo = ({ label, text }: { label: string; text: string }) => {
  return (
    <div className="flex flex-col">
      <p className="text-sm text-brand-muted">{label}</p>
      <p className="text-lg font-medium text-brand-muted">{text}</p>
    </div>
  )
}

export default UserInfo
