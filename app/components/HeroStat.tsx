const HeroStat = ({ stat, label }: { stat: string; label: string }) => {
  return (
    <div className="grow text-center">
      <p className="text-[1.2rem] font-bold text-primary-foreground">{stat}</p>
      <p className="text-base text-primary-foreground">{label}</p>
    </div>
  )
}

export default HeroStat
