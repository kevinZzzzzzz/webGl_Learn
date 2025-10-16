"use client"

import earth_winter_5400x2700 from "@/assets/images/earth_winter_5400x2700.jpg"
import { createAxis } from "@/lib/objects/axis"
import { useIndexStore } from "@/stores"
import { useEffect, useState } from "react"
import { Mesh, MeshStandardMaterial, SphereGeometry, TextureLoader } from "three"

interface EarthConfig {
	radiusMultiplier?: number
	segments?: number
	showAxis?: boolean
}

export function useEarth(config?: EarthConfig) {
	const [earth, setEarth] = useState<Mesh | null>(null)

	const {
		radiusMultiplier,
		speedMultiplier,
		earth: { earthRadius, earthRotationSpeed, earthRotationAccel },
	} = useIndexStore((state) => state)

	useEffect(() => {
		const loader = new TextureLoader()
		const colorTexture = loader.load(earth_winter_5400x2700.src)

		const geometry = new SphereGeometry(
			earthRadius * (config?.radiusMultiplier || 1) * radiusMultiplier,
			config?.segments || 256,
			config?.segments || 256
		)

		const material = new MeshStandardMaterial({
			map: colorTexture,
			roughness: 0.6,
			metalness: 0,
		})

		const earthMesh = new Mesh(geometry, material)
		earthMesh.castShadow = true
		earthMesh.receiveShadow = true

		// rotation
		let rotationSpeed = 0
		const animate = () => {
			requestAnimationFrame(animate)
			rotationSpeed += (earthRotationSpeed * speedMultiplier - rotationSpeed) * earthRotationAccel
			earthMesh.rotateY(rotationSpeed)
		}
		animate()

		// axis
		if (config?.showAxis) {
			const rotationAxis = createAxis({
				length: earthRadius * (config?.radiusMultiplier || 1) * 1.33,
			})
			earthMesh.add(rotationAxis)
		}

		setEarth(earthMesh)

		return () => {
			setEarth(null)
		}
	}, [radiusMultiplier, speedMultiplier, earthRadius, config?.radiusMultiplier, config?.segments, config?.showAxis])

	return earth
}
