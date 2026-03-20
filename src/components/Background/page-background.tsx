'use client'
import type React from 'react'
import AmbientBackground from './ambient-background'

const MatrixEffect: React.FC = () => {
	return (
		<div className="pointer-events-none fixed top-0 left-0 right-0 bottom-0 overflow-hidden z-0">
			<AmbientBackground />
		</div>
	)
}

export default MatrixEffect
