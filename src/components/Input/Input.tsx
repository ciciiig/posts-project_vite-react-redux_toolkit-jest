import { FC } from "react"
import config from "../../../config.json"
import { useAppDispatch } from "../../redux/hooks"
import { setSearchValue } from "../../redux/posts"
import { setCurrentPage, setPreviousPage } from "../../redux/pagination"

export const Input: FC = () => {
  const dispatch = useAppDispatch()

  function handeInputSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value.trim()
    if (inputValue.length >= 3) {
      dispatch(setSearchValue(inputValue))
      dispatch(setPreviousPage())
    } else {
      dispatch(setSearchValue(""))
      dispatch(setPreviousPage())
    }
    dispatch(setCurrentPage(1))
  }

  return (
    <input
      type="search"
      id="search-input"
      className="search-input"
      size={40}
      placeholder={config ? config.searchInputPlaceholder : ""}
      onChange={handeInputSearchInput}
    />
  )
}
