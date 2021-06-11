import * as React from 'react'
import classNames from 'classnames'
import Tippy from '@tippyjs/react'

const CueBar: React.FC<any> = ({
  className,
  disableCompletely,
  player,
  actions,
}) => {
  const {duration, activeMetadataTracks} = player

  const noteTracks = activeMetadataTracks.filter((track: TextTrack) => {
    return track.label === 'notes'
  })

  const noteCues = noteTracks.reduce((acc: VTTCue[], track: TextTrack) => {
    return [...acc, ...Array.from(track.cues || [])]
  }, [])

  return disableCompletely ? null : (
    <div className={classNames('cueplayer-react-cue-bar', className)}>
      {noteCues.map((noteCue: any) => {
        return (
          <NoteCue
            key={noteCue.text}
            cue={noteCue}
            duration={duration}
            player={player}
            actions={actions}
          />
        )
      })}
    </div>
  )
}

export default CueBar

const useCue = (cue: VTTCue, actions: any) => {
  const setActive = React.useCallback(
    function setActive(active) {
      if (active) {
        actions.activateMetadataTrackCue(cue)
      } else {
        actions.activateMetadataTrackCue(null)
      }
    },
    [actions],
  )

  React.useEffect(() => {
    const enterCue = () => {
      setActive(true)
    }

    const exitCue = () => {
      setActive(false)
    }

    cue.addEventListener('enter', enterCue)
    cue.addEventListener('exit', exitCue)

    return () => {
      cue.removeEventListener('enter', enterCue)
      cue.removeEventListener('exit', exitCue)
    }
  }, [cue, setActive])

  return setActive
}

const NoteCue: React.FC<any> = ({
  cue,
  duration,
  className,
  actions,
  player,
}) => {
  const setVisible = useCue(cue, actions)
  const [persist, setPersist] = React.useState(false)
  const show = () => setVisible(true)
  const hide = () => setVisible(false)
  const open = () => {
    show()
    setPersist(true)
  }
  const close = () => {
    hide()
    setPersist(false)
  }
  const visible = cue === player.activeMetadataTrackCue
  const startPosition = `${(cue.startTime / duration) * 100}%`
  const note = JSON.parse(cue.text)

  return (
    <Tippy
      placement="top"
      theme="light"
      content={note.title}
      visible={visible}
      onClickOutside={close}
      followCursor={true}
    >
      <div
        onMouseOver={show}
        onClick={open}
        onMouseOut={() => !persist && hide()}
        className={classNames(
          'cueplayer-react-cue-note',
          {
            'cueplayer-react-cue-note-active': visible,
            'cueplayer-react-cue-note-inactive': !visible,
          },
          className,
        )}
        style={{left: startPosition}}
      />
    </Tippy>
  )
}
