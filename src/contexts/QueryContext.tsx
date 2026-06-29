import { createContext, useState } from "react";
import { D3EmptyQuery, D3Query } from "../models/query";

type QueryContextType = {
    queries: D3Query[];
    addQuery: () => void;
};

export const QueryContext = createContext<QueryContextType | null>(null);

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [queries, setQueries] = useState<D3Query[]>([new D3EmptyQuery()]);

    const addQuery = () => setQueries([...queries, new D3EmptyQuery()]);

    return (
        <QueryContext.Provider
            value={{
                queries,
                addQuery,
            }}
        >
            {children}
        </QueryContext.Provider>
    );
};
