"use client"

import { useCallback, useState } from "react"
import { type FileRejection, useDropzone as useReactDropzone } from "react-dropzone"

interface UseDropzoneProps {
  onDrop?: (acceptedFiles: File[]) => void
  onReject?: (fileRejections: FileRejection[]) => void
  maxSize?: number
  accept?: Record<string, string[]>
}

export function useDropzone({
  onDrop,
  onReject,
  maxSize = 100 * 1024 * 1024, // 100MB default
  accept = {
    "audio/*": [".mp3", ".wav", ".m4a", ".aac", ".ogg"],
    "video/*": [".mp4", ".mov", ".avi"],
  },
}: UseDropzoneProps = {}) {
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragActive(false)
      if (onDrop) onDrop(acceptedFiles)
    },
    [onDrop],
  )

  const handleReject = useCallback(
    (fileRejections: FileRejection[]) => {
      setIsDragActive(false)
      if (onReject) onReject(fileRejections)
    },
    [onReject],
  )

  const handleDragEnter = useCallback(() => {
    setIsDragActive(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragActive(false)
  }, [])

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useReactDropzone({
    onDrop: handleDrop,
    onDropRejected: handleReject,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    maxSize,
    accept,
  })

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  }
}
