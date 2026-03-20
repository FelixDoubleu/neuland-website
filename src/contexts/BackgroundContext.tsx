'use client'
import type React from 'react'
import { createContext, useContext, useState } from 'react'

interface BackgroundContextType {
	crossesRotationToken: number
	triggerCrossesRotation: () => void
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(
	undefined
)

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [crossesRotationToken, setCrossesRotationToken] = useState(0)

	const triggerCrossesRotation = () => {
		setCrossesRotationToken((prev) => prev + 1)
	}

	return (
		<BackgroundContext.Provider
			value={{
				crossesRotationToken,
				triggerCrossesRotation
			}}
		>
			{children}
		</BackgroundContext.Provider>
	)
}

export const useBackground = (): BackgroundContextType => {
	const context = useContext(BackgroundContext)
	if (context === undefined) {
		throw new Error('useBackground must be used within a BackgroundProvider')
	}
	return context
}
