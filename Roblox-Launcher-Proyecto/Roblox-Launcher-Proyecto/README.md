# Roblox Launcher para Windows

Proyecto de ejemplo con interfaz oscura. No es una aplicación oficial de Roblox.

## Importante
- El ZIP no incluye Roblox ni redistribuye archivos de su cliente.
- **Instalar Roblox** abre https://www.roblox.com/download.
- **Jugar Roblox** solicita a Windows abrir el protocolo oficial `roblox-player:`.
- Roblox administra las actualizaciones de su propio cliente.
- El actualizador automático de este proyecto actualiza únicamente el lanzador y necesita GitHub Releases configurado.

## Subir a GitHub
1. Crea un repositorio nuevo, por ejemplo `roblox-launcher`.
2. Sube el contenido de esta carpeta a la raíz del repositorio. No metas todo dentro de otra carpeta.
3. En `package.json`, reemplaza `CAMBIA_TU_USUARIO` por tu usuario de GitHub y `CAMBIA_TU_REPOSITORIO` por el nombre exacto del repositorio.
4. Abre **Actions** y ejecuta `Build Roblox Launcher for Windows`.
5. Cuando termine, abre la ejecución verde y descarga **Roblox-Launcher-Windows** en Artifacts.

## Publicar una versión para el actualizador
1. Cada versión nueva requiere subir el número `version` en `package.json` (por ejemplo, `1.0.1`).
2. Después de subir los cambios, crea una etiqueta nueva como `v1.0.1` y súbela al repositorio.
3. El flujo compilará y publicará el instalador, `latest.yml` y archivos `.blockmap` en GitHub Releases.
4. Las instalaciones existentes pueden detectar y descargar las nuevas versiones del lanzador. La actualización se instala al cerrar la aplicación.

La configuración de autoactualización no se puede verificar hasta que se suba a un repositorio real y se publique una Release.

## Compilar manualmente (opcional)
Con Node.js instalado: `npm install` y `npm run dist`. El instalador aparece en `release/`.
