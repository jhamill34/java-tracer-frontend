import { useCombobox } from "downshift"
import React, { useMemo } from "react"
import { FixedSizeList } from "react-window"
import debounce from "lodash.debounce"
import InfiniteLoader from "react-window-infinite-loader"

export interface Item {
    id: string
    title: string
    subtitle: string
}

export interface SearchProps {
    onInputChange: (value: string) => Promise<void>
    onFetchMore: () => Promise<void>
    onSelect: (id: string) => void
    placeholder: string
    hasMore: boolean
    items: Item[]
}

export function Search(props: SearchProps): React.ReactElement {
    const { onInputChange, placeholder, hasMore, onFetchMore, items, onSelect } = props

    const changeHandler = (inputValue: string): void => {
        onInputChange(inputValue)
            .then(() => {})
            .catch(() => {})
    }

    const inputChange = useMemo(() => {
        return debounce(changeHandler, 300)
    }, [onInputChange])

    const {
        isOpen,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        getInputProps,
        getComboboxProps,
        getItemProps,
    } = useCombobox({
        items,
        onSelectedItemChange: (item) => {
            if (item?.selectedItem?.id != null) {
                onSelect(item.selectedItem.id)
            }
        },
        onInputValueChange: ({ inputValue }) => {
            if (inputValue != null) {
                inputChange(inputValue)
            }
        },
        itemToString: (item) => item?.title ?? "",
    })

    const itemCount = hasMore ? items.length + 1 : items.length
    const isItemLoaded = (index: number): boolean => index < items.length

    return (
        <div className="col-span-4">
            <div className="flex flex-row gap-1 items-baseline">
                <label className="font-bold" {...getLabelProps()}>
                    Class Name:
                </label>
                <div className="flex flex-1 shadow-md bg-light gap-0.5" {...getComboboxProps()}>
                    <input className="p-2 flex-1" placeholder={placeholder} {...getInputProps()} />
                    <button className="px-2" {...getToggleButtonProps()}>
                        {isOpen ? <>&#8593;</> : <>&#8595;</>}
                    </button>
                </div>
            </div>
            <ul className="absolute left-16 w-1/3 p-0 bg-light" {...getMenuProps()}>
                {isOpen && (
                    <InfiniteLoader
                        isItemLoaded={isItemLoaded}
                        itemCount={itemCount}
                        loadMoreItems={onFetchMore}
                    >
                        {({ onItemsRendered, ref }) => (
                            <FixedSizeList
                                width="100%"
                                onItemsRendered={onItemsRendered}
                                className="shadow-md"
                                ref={ref}
                                height={500}
                                itemCount={itemCount}
                                itemSize={42}
                            >
                                {({ index, style }) => (
                                    <div
                                        className="py-2 bg-light px-3 flex flex-row align-middle justify-between border-b-2 border-gray-100 hover:bg-slate-100 transition-colors cursor-pointer"
                                        style={style}
                                        {...getItemProps({ item: items[index], index })}
                                    >
                                        {isItemLoaded(index) ? (
                                            <>
                                                <span>{items[index].title}</span>
                                                <span className="text-sm text-gray-400">
                                                    {items[index].subtitle}
                                                </span>
                                            </>
                                        ) : (
                                            "Loading..."
                                        )}
                                    </div>
                                )}
                            </FixedSizeList>
                        )}
                    </InfiniteLoader>
                )}
            </ul>
        </div>
    )
}
