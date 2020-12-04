export interface CaptionsAdapter {
  setCurrentTextTrack?(trackId: number): void
  setTextTrackVisibility?(isVisible: boolean): void
}
