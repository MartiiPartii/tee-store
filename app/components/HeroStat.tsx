const HeroStat = ({ stat, label }: { stat: string; label: string }) => {
  return (
    <div className="grow text-center">
      <p className="text-2xl font-semibold tracking-tight text-primary-foreground sm:text-3xl">
        {stat}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/75">
        {label}
      </p>
    </div>
  )
}

export default HeroStat
