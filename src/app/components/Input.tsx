import { FC } from "react"
import config from "../../../config.json"
import { useAppDispatch } from "../hooks"
import { setSearchValue } from "../../features/posts/postsSlice"
import { setCurrentPage } from "../../features/pagination/paginationSlice"

export const Input: FC = () => {
  const dispatch = useAppDispatch()

  function handeInputSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value.trim()
    if (inputValue.length >= 3) {
      dispatch(setSearchValue(inputValue))
      dispatch(setCurrentPage(1))
    } else {
      dispatch(setSearchValue(""))
    }
  }

  return (
    <input
      type="search"
      id="search-input"
      className="search-input"
      size={40}
      placeholder={config.searchInputPlaceholder}
      onChange={handeInputSearchInput}
    />
  )
}
