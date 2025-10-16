"use client"

import { useClouds } from "@/hooks/use-clouds"
import { useEarth } from "@/hooks/use-earth"
import { useMoon } from "@/hooks/use-moon"
import { useIndexStore } from "@/stores"
import { useEffect } from "react"
import { MathUtils, Object3D } from "three"

interface Props {
	world: Object3D | null
}

export function Earth({ world }: Props) {
	if (!world) return null

	const {
		speedMultiplier,
		moon: { moonDistance, moonDistanceMultiplier, moonOrbitSpeed },
	} = useIndexStore((state) => state)

	const earth = useEarth()
	const clouds = useClouds()
	const moon = useMoon({ segments: 64 })

	useEffect(() => {
		if (!earth || !clouds || !moon) return

		earth.add(clouds)
		world.add(earth)

		// moon pivot for orbit
		const moonPivot = new Object3D()
		moonPivot.rotation.x = MathUtils.degToRad(5)
		moon.position.set(moonDistance * moonDistanceMultiplier, 0, 0)
		moonPivot.add(moon)
		world.add(moonPivot)

		let animationId: number
		const animate = () => {
			animationId = requestAnimationFrame(animate)
			moonPivot.rotateY(moonOrbitSpeed * speedMultiplier) // orbit around earth
		}
		animate()

		return () => {
			world.remove(earth)
			world.remove(moonPivot)
			cancelAnimationFrame(animationId)
		}
	}, [world, earth, clouds, moon, moonDistance, moonDistanceMultiplier, moonOrbitSpeed, speedMultiplier])

	return null
}
