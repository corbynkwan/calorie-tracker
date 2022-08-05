import { Menu } from "antd";

export const nutrientMenu = (handleDataFetching, nutrientDropdownCategories, selectedItem) => {
  return (
    <Menu
      items={nutrientDropdownCategories.map((item) => {
        return (
          selectedItem.key != item.key && {
            label: item.content,
            key: item.key,
            onClick: (e) => handleDataFetching(e.key, item.value),
          }
        );
      })}
    />
  );
};
