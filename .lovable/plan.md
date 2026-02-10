

## Add Red Volume Button to Hero Video

### What changes
Add a red, circular mute/unmute toggle button overlaid on the hero video (the Gene Ryland video on the right side). This lets visitors know the video has audio and gives them a way to turn it on.

### Technical details

**File:** `src/pages/Index.tsx`

1. **Add state** at the top of the `Index` component:
   - `const [isMuted, setIsMuted] = useState(true)`
   - `const videoRef = useRef<HTMLVideoElement>(null)`

2. **Attach ref** to the hero video element at line 510 and bind `muted={isMuted}` instead of the static `muted` attribute.

3. **Add a red volume button** positioned absolutely over the bottom-right corner of the video:
   - Uses `lucide-react` icons: `VolumeX` (muted) / `Volume2` (unmuted)
   - Styled as a red circle (`bg-red-600 hover:bg-red-700`) with white icon
   - Includes a subtle pulse animation when muted to draw attention
   - On click, toggles `isMuted` state

4. **Button markup** (placed right after the `<video>` element, inside the same relative container):
```tsx
<button
  onClick={() => setIsMuted(!isMuted)}
  className="absolute bottom-4 right-4 z-20 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition-colors"
>
  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
</button>
```

5. **Imports** to add: `useState`, `useRef` from React; `VolumeX`, `Volume2` from `lucide-react`.

