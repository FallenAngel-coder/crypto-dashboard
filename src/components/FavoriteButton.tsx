import { useDashboardStore } from '../store/useDashboardStore'

type FavoriteButtonProps = {
  id: string
  name: string
}

function FavoriteButton({ id, name }: FavoriteButtonProps) {
  const isFavorite = useDashboardStore((state) => state.favorites.includes(id))
  const toggleFavorite = useDashboardStore((state) => state.toggleFavorite)

  return (
    <button
      className="favorite-button"
      type="button"
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `Видалити ${name} з обраного` : `Додати ${name} до обраного`}
      onClick={(event) => {
        event.stopPropagation()
        toggleFavorite(id)
      }}
      onKeyDown={(event) => event.stopPropagation()}
    >
      {isFavorite ? '★ В обраному' : '☆ В обране'}
    </button>
  )
}

export default FavoriteButton
