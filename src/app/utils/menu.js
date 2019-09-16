// Conversion router to menu.
function formatter(data, parentName) {
    return data
      .map(item => {
        if (!item.name || !item.path) {
          return null;
        }
  
        const result = {
          ...item,
          name: item.name,
        };
        if (item.routes) {
          const children = formatter(item.routes);
          // Reduce memory usage
          result.children = children;
        }
        delete result.routes;
        return result;
      })
      .filter(item => item);
}

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
      return {
        ...item,
        children: filterMenuData(item.children), // eslint-disable-line
      };
    }
    return item;
};
/**
 * filter menuData
 */
const filterMenuData = menuData => {
    if (!menuData) {
      return [];
    }
    return menuData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        // make dom
        return getSubMenu(item);
      })
      .filter(item => item);
  };
/**
 * @param {Object} menuData
 */
const getBreadcrumbNameMap = menuData => {
    const routerMap = {};
  
    const flattenMenuData = data => {
      data.forEach(menuItem => {
        if (menuItem.children) {
          flattenMenuData(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    flattenMenuData(menuData);
    return routerMap;
  };

export function getMenuData(routes) {
    //const menuData = filterMenuData(formatter(routes));
    const menuData = filterMenuData(routes);
    const breadcrumbNameMap = getBreadcrumbNameMap(menuData)

    return { menuData, breadcrumbNameMap };
  }