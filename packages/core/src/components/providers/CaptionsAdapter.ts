export interface CaptionsAdapter {
  getTextTracks?(): TextTrack[]
  getCurrentTextTrack?(): number
  setCurrentTextTrack?(trackId: number): void
  getTextTrackVisibility?(): boolean
  setTextTrackVisibility?(isVisible: boolean): void
  renderNativeTextTracks?(shouldRender: boolean): void
}
