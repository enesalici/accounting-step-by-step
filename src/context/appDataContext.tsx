/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from 'react'

type AppDataContextType = {
    transactions: any[]
    setTransactions: React.Dispatch<React.SetStateAction<any[]>>
    transactionCategories: any[]
    transactionTypes: any[]
    users: any[]
    loading: boolean
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined)

export const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [transactions, setTransactions] = useState<any[]>([])
    const [transactionCategories, setTransactionCategories] = useState<any[]>([])
    const [transactionTypes, setTransactionTypes] = useState<any[]>([])
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    transactionRes,
                    categoryRes,
                    typeRes,
                    userRes
                ] = await Promise.all([
                    fetch('/api/transaction'),
                    fetch('/api/transaction-category'),
                    fetch('/api/transaction-type'),
                    fetch('/api/user')
                ])

                const [transactionData, categoryData, typeData, userData] = await Promise.all([
                    transactionRes.json(),
                    categoryRes.json(),
                    typeRes.json(),
                    userRes.json()
                ])

                setTransactions(transactionData.details)
                setTransactionCategories(categoryData.details)
                setTransactionTypes(typeData.details)
                setUsers(userData.details)
            } catch (err) {
                console.error('Veri çekilirken hata:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <AppDataContext.Provider value={{
            transactions,
            setTransactions,
            transactionCategories,
            transactionTypes,
            users,
            loading
        }}>
            {children}
        </AppDataContext.Provider>
    )
}

export const useAppData = () => {
    const context = useContext(AppDataContext)
    if (!context) {
        throw new Error('useAppData hook must be used inside AppDataProvider')
    }
    return context
}
