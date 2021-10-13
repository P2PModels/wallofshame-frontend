export function AppStateProvider({ children }) {
    return (
        //   <AppStateContext.Provider value={appState}>
        <AppStateContext.Provider>{children}</AppStateContext.Provider>
    )
}
