const TabContext = React.createContext({
  current: null,
  tabs: [],
  addTab: () => {},
  setCurrent: () => {},
});

const Direction = {
  NEXT: "next",
  PREVIOUS: "previous",
};

function useTabs(ref) {
  const [current, setCurrent] = React.useState(null);
  const [tabs, setTabs] = React.useState([]);
  const [globalDir, setGlobalDir] = React.useState(true);
  React.useLayoutEffect(
    () =>
      setGlobalDir(getComputedStyle(ref.current).direction === "ltr" ? 1 : -1),
    [ref]
  );
  const addTab = React.useCallback((name) => {
    setTabs((list) => [
      ...list,
      {
        id: list.length + 1,
        name,
      },
    ]);
  }, []);
  const goto = React.useCallback(
    (dir) => {
      const offset = tabs.findIndex(({ id }) => id === current);
      const delta = globalDir * (dir === Direction.PREVIOUS ? -1 : 1);
      const destination = Math.max(
        0,
        Math.min(tabs.length - 1, offset + delta)
      );
      const newId = tabs[destination].id;
      setCurrent(newId);
      return newId;
    },
    [globalDir, tabs, current]
  );
  React.useEffect(() => {
    if (tabs.length) setCurrent(tabs[0].id);
  }, [tabs.length]);

  return {
    current,
    tabs,
    addTab,
    setCurrent,
    goto,
  };
}

function Tabs({ name, children }) {
  const ref = React.useRef();
  const value = useTabs(ref);
  return (
    <TabContext.Provider value={value}>
      <TabList ref={ref} name={name} />
      {children}
    </TabContext.Provider>
  );
}

function useTabList(name) {
  const { current, tabs, setCurrent, goto } = React.useContext(TabContext);
  const handleClick = (id) => () => setCurrent(id);
  const handleKeyDown = (evt) => {
    let newId;
    switch (evt.key) {
      case "ArrowLeft":
        newId = goto(Direction.PREVIOUS);
        break;
      case "ArrowRight":
        newId = goto(Direction.NEXT);
        break;
    }
    if (newId) {
      document.getElementById(`tab${newId}`).focus();
    }
  };
  const tabData = tabs.map(({ id, name }) => {
    const isActive = id === current;
    return {
      name,
      isActive,
      attrs: {
        "aria-controls": `panel${id}`,
        "aria-selected": isActive,
        id: `tab${id}`,
        role: "tab",
        tabIndex: isActive ? 0 : -1,
        onClick: handleClick(id),
      },
    };
  });
  return {
    tablist: {
      role: "tablist",
      "aria-label": name,
      onKeyDown: handleKeyDown,
    },
    tabs: tabData,
  };
}

function TabListWithoutRef({ name }, ref) {
  const { tablist, tabs } = useTabList(name);
  return (
    <ul ref={ref} className="tablist" {...tablist}>
      {tabs.map(({ name, isActive, attrs }) => (
        <li
          key={name}
          className={`tab ${isActive ? "tab--active" : ""}`}
          {...attrs}
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

const TabList = React.forwardRef(TabListWithoutRef);

function useTab(name) {
  const { current, tabs, addTab } = React.useContext(TabContext);
  React.useEffect(() => addTab(name), []);
  const self = tabs.find(({ name: tabName }) => tabName === name) || {};
  return {
    "aria-labelledby": `tab${self.id}`,
    id: `panel${self.id}`,
    role: "tabpanel",
    hidden: current !== self.id,
  };
}

function Tab({ name, children }) {
  const attrs = useTab(name);
  return (
    <section className="tabpanel" hidden {...attrs}>
      {children}
    </section>
  );
}

function App() {
  return (
    <Tabs name="Members">
      <Tab name="John">
        <h1>Hi, I'm John</h1>
        <button>Click me to read more</button>
      </Tab>
      <Tab name="Ringo">
        <h1>Hi, I'm Ringo</h1>
        <button>Click me to read more</button>
      </Tab>
      <Tab name="Paul">
        <h1>Hi, I'm Paul</h1>
        <button>Click me to read more</button>
      </Tab>
    </Tabs>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
